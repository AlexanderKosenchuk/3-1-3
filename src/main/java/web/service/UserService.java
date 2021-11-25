package web.service;

import web.model.User;

import java.util.List;

public interface UserService {
    List<User> getAllUser();
    void deleteUser(User user);
    void addUser(User user);
    void editUser(User user);
    User getUserById(int id);
}
