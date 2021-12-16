package web.dao;

import org.springframework.stereotype.Repository;
import web.model.Role;
import web.model.User;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;



@Repository
public class RoleDaoImpl implements RoleDao{

    @PersistenceContext
    private EntityManager entityManager;

    public Role getRoleByName(String roleName) {
        TypedQuery<Role> queryName = entityManager.createQuery("select r from Role r where r.role = :role", Role.class);
        queryName.setParameter("role", roleName);
        return queryName.getSingleResult();

    }

}
