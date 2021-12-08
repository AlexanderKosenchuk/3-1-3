package web.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import web.dao.UserDao;
import web.model.Role;
import web.model.User;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {


    private PasswordEncoder passwordEncoder;

    private final UserDao userDaoImpl;

    @Autowired
    public UserServiceImpl(UserDao userDaoImpl, PasswordEncoder passwordEncoder) {
        this.userDaoImpl = userDaoImpl;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public List<User> getAllUser() {
        return userDaoImpl.getAllUser();
    }

    @Override
    @Transactional
    public void deleteUser(User user) {
        userDaoImpl.deleteUser(user);
    }

    @Override
    @Transactional
    public void addUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userDaoImpl.addUser(user);
    }

    @Override
    @Transactional
    public void editUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userDaoImpl.editUser(user);
    }

    @Override
    @Transactional
    public User getUserById(int id) {
        return userDaoImpl.getUserById(id);
    }

    @Override
    @Transactional
    public void saveRole(Role role) {

        userDaoImpl.saveRole(role);
    }

}
