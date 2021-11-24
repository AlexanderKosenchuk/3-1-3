package web.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import web.dao.UserDao;
import web.dao.UserDaoImpl;
import web.model.User;

import java.util.List;

@Service
@Transactional
public class UserServiceImpl implements UserService{

    private final UserDao userDaoImpl;

    @Autowired
    public UserServiceImpl(UserDao userDaoImpl) {
        this.userDaoImpl = userDaoImpl;
    }

    @Override
    public List<User> getAllUser() {
        return userDaoImpl.getAllUser();
    }

    @Override
    public void deleteUser(int id) {
        userDaoImpl.deleteUser(id);
    }

    @Override
    public void addUser(User user) {

    }

    @Override
    @Transactional
    public void editUser() {

    }

}
