package web.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import web.model.Role;
import web.model.User;
import web.service.UserService;
import javax.annotation.PostConstruct;
import javax.persistence.TypedQuery;
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
    @Transactional

    public void initTestUserDb() {

        Role roleAdmin = new Role("ADMIN");
        userService.saveRole(roleAdmin);

        Set<Role> roles = new HashSet<>();

        User userAll = new User("admin", "admin", "Ivanov", 27, "admin@gmail.com", roles);
        userService.addUser(userAll);

        userAll.addRole(roleAdmin);
        userService.editUser(userAll);
//------------------------------------------
        Role roleUser = new Role("USER");
        userService.saveRole(roleUser);

        Set<Role> roles1 = new HashSet<>();

        User userOnly = new User("user", "user", "Petrov", 28, "user@gmail.com", roles1);
        userService.addUser(userOnly);

        userOnly.addRole(roleUser);
        userService.editUser(userOnly);
    }
}
