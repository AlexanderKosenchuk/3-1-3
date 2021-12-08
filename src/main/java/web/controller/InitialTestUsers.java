package web.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import web.model.Role;
import web.model.User;
import web.service.UserService;
import javax.annotation.PostConstruct;
import java.util.HashSet;
import java.util.Set;

@Component
public class InitialTestUsers {

    private final UserService userService;
    private final UserDetailsService userDetailsService;

    @Autowired
    public InitialTestUsers(UserService userService, @Qualifier("userDetailsServiceImpl")UserDetailsService userDetailsService) {
        this.userService = userService;
        this.userDetailsService = userDetailsService;
    }

    @PostConstruct
    private void initTestUserDb() {

        Set<Role> roles = new HashSet<>();
        roles.add(new Role("ADMIN"));
        roles.add(new Role("USER"));

        User userAll = new User("admin", "admin", "Ivanov", 27, "admin@gmail.com", roles);
        userService.addUser(userAll);

        Set<Role> roles1 = new HashSet<>();
        roles1.add(new Role("USER"));

        User userOnly = new User("user", "user", "Petrov", 28, "user@gmail.com", roles1);
        userService.addUser(userOnly);

        Set<Role> roles2 = new HashSet<>();
        roles2.add(new Role("ADMIN"));

        User userAdmin = new User("test", "test", "Testov", 28, "superadmin@gmail.com", roles2);
        userService.addUser(userAdmin);

    }
}
