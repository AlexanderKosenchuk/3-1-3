package web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import web.model.Role;
import web.model.User;
import web.service.UserService;

import java.security.Principal;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
public class AdminController {

    private final UserService userService;
    private final UserDetailsService userDetailsService;

    @Autowired
    public AdminController(UserService userService, @Qualifier("userDetailsServiceImpl")UserDetailsService userDetailsService) {
        this.userService = userService;
        this.userDetailsService = userDetailsService;
    }

    @GetMapping(value = "/admin")
    public  List<User> showAllUsers() {
        List<User> allUsers = userService.getAllUser();
        return allUsers;
    }

    @PostMapping(value = "/admin")
    public User createUser(@RequestBody User user) {
        userService.addUser(user);
        return user;
    }

    @GetMapping(value = "/admin/{id}")
    public User getOneUser(@PathVariable("id") int id) {
        User user = userService.getUserById(id);
        return user;
    }

    @PatchMapping("/admin")
    public User updateUser(@RequestBody User user) {
        userService.editUser(user);
        return user;
    }

    @DeleteMapping(value = "/admin/{id}")
    public String deleteUser(@PathVariable int id) {
        userService.deleteUser(userService.getUserById(id));
        return "User with ID = " + id + " was deleted";
    }
}
