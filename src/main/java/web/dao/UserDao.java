package web.dao;

import web.model.User;

import java.util.List;

public interface UserDao {

    List<User> getAllUser();
    void deleteUser(int id);
    void addUser(User user);
    void editUser();

}
