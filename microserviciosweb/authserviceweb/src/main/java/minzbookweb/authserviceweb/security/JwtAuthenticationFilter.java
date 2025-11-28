package minzbookweb.authserviceweb.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import minzbookweb.authserviceweb.model.Role;
import minzbookweb.authserviceweb.model.User;
import minzbookweb.authserviceweb.repository.UserRepository;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserRepository userRepository;

    public JwtAuthenticationFilter(JwtService jwtService,
                                   UserRepository userRepository) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = authHeader.substring(7);

        try {
            Jws<Claims> jws = jwtService.parseToken(token);
            Claims claims = jws.getBody();

            String email = claims.getSubject();
            Object roleClaim = claims.get("role");

            if (email != null && roleClaim != null &&
                    SecurityContextHolder.getContext().getAuthentication() == null) {

                Optional<User> optUser = userRepository.findByEmail(email);
                if (optUser.isPresent()) {
                    User user = optUser.get();
                    Role role = user.getRole();
                    SimpleGrantedAuthority authority =
                            new SimpleGrantedAuthority("ROLE_" + role.name());

                    UsernamePasswordAuthenticationToken authToken =
                            new UsernamePasswordAuthenticationToken(
                                    user.getEmail(),
                                    null,
                                    List.of(authority)
                            );

                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }

        } catch (JwtException e) {
            // Token inválido/expirado, no autenticar
        }

        filterChain.doFilter(request, response);
    }
}
