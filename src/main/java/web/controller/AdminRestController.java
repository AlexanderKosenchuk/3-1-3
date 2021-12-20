package web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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
import java.util.Set;

@CrossOrigin
@RestController
public class AdminRestController {

    private final UserService userService;
    private final UserDetailsService userDetailsService;

    @Autowired
    public AdminRestController(UserService userService, @Qualifier("userDetailsServiceImpl")UserDetailsService userDetailsService) {
        this.userService = userService;
        this.userDetailsService = userDetailsService;
    }

    @GetMapping(value = "/admin/all")
    public ResponseEntity<List<User>> showAllUsers() {
        List<User> allUsers = userService.getAllUser();
        return new ResponseEntity<>(allUsers, HttpStatus.OK);
    }

    @PostMapping(value = "/admin")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        userService.addUser(user);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @GetMapping(value = "/admin/{id}")
    public ResponseEntity<User> getOneUser(@PathVariable("id") Integer id) {
        User user = userService.getUserById(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PatchMapping("/admin")
    public ResponseEntity<User> updateUser(@RequestBody User user) {
        userService.editUser(user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @DeleteMapping(value = "/admin/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Integer id) {
        userService.deleteUser(userService.getUserById(id));
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
