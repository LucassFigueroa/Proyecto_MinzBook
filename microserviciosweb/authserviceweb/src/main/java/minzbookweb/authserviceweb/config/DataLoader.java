package minzbookweb.authserviceweb.config;

import minzbookweb.authserviceweb.model.Role;
import minzbookweb.authserviceweb.model.User;
import minzbookweb.authserviceweb.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataLoader(UserRepository userRepository,
                      PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (!userRepository.existsByEmail("admin@minzbook.cl")) {
            User admin = new User(
                    "Admin MinzBook",
                    "admin@minzbook.cl",
                    passwordEncoder.encode("admin123"),
                    Role.ADMIN
            );
            userRepository.save(admin);
        }

        if (!userRepository.existsByEmail("support@minzbook.cl")) {
            User support = new User(
                    "Soporte MinzBook",
                    "support@minzbook.cl",
                    passwordEncoder.encode("support123"),
                    Role.SUPPORT
            );
            userRepository.save(support);
        }
    }
}
