package web.dao;

import web.model.Role;
import web.model.User;

import java.util.List;
import java.util.Set;

public interface UserDao {

    List<User> getAllUser();
    void deleteUser(User user);
    void addUser(User user);
    void editUser(User user);
    User getUserById(int id);
    //User getUserByName(String name);
    User getUserByEmail(String email);
    void saveRole(Role role);

}
