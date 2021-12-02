package web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import web.dao.UserDao;
import web.model.User;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserDao userDaoImpl;

    @Autowired
    public UserDetailsServiceImpl(UserDao userDao) {
        this.userDaoImpl = userDao;
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        User user = userDaoImpl.getUserByName(s);
        if(user == null) {
            throw  new UsernameNotFoundException("User not found");
        }
        return user;
    }

}
