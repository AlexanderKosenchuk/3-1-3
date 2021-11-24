package web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import web.model.User;
import web.service.UserServiceImpl;

import java.util.List;

@Controller
public class UserController {

    private final UserServiceImpl userService;

    @Autowired
    public UserController(UserServiceImpl userService) {
        this.userService = userService;
    }

    @GetMapping(value = "/")
    public String showAllUsers(Model model) {
        List<User> allUsers = userService.getAllUser();
        model.addAttribute("allUsers", allUsers);
        return "users";
    }
}
