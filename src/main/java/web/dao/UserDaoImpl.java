package web.dao;


import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import web.model.User;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.List;

@Repository
public class UserDaoImpl implements UserDao {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<User> getAllUser() {
        TypedQuery<User> query = entityManager.createQuery("select u from User u", User.class);
        return query.getResultList();
    }

    @Override
    public void deleteUser(int id) {

        entityManager.remove(id);
    }

    @Override
    public void addUser(User user) {
        entityManager.persist(user);
    }

    @Override
    public void editUser() {

    }
}
