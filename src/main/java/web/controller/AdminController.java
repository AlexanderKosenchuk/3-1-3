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

import java.util.List;

@Controller
public class AdminController {

    private final UserService userService;
    private final UserDetailsService userDetailsService;

    @Autowired
    public AdminController(UserService userService, @Qualifier("userDetailsServiceImpl")UserDetailsService userDetailsService) {
        this.userService = userService;
        this.userDetailsService = userDetailsService;
    }

    @GetMapping(value = "/admin")
    public String showAllUsers(Model model) {
        List<User> allUsers = userService.getAllUser();
        model.addAttribute("allUsers", allUsers);
        return "admin";
    }
    //get запрос, который вернет представление new
    @GetMapping(value = "/admin/new")
    public String addNewUser(@ModelAttribute("user") User user, @ModelAttribute("roles") Role role) {
        return "/new";
    }

    @PostMapping(value = "/admin")
    public String createUser(@ModelAttribute("user") User user) {
        userService.addUser(user);
        return "redirect:/admin";
    }

    @GetMapping(value = "/{id}/edit")
    public String editFormUser(@PathVariable("id") int id, Model model) {
        model.addAttribute("user", userService.getUserById(id));
        return "/edit";
    }

    @PatchMapping("/admin/{id}")
    public String updateUser(@ModelAttribute("user") User user) {
        userService.editUser(user);
        return "redirect:/admin";
    }

    @DeleteMapping
    public String deleteUser(@ModelAttribute("user") User user) {
        userService.deleteUser(user);
        return "redirect:/admin";
    }
}
