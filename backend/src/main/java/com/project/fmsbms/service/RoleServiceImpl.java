package com.project.fmsbms.service;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.fmsbms.entities.ERole;
import com.project.fmsbms.entities.Role;
import com.project.fmsbms.exceptions.RoleNotFoundException;
import com.project.fmsbms.repositories.RoleRepository;
 
 
@Service
public class RoleServiceImpl implements RoleService {
	private static final Logger loggers = LoggerFactory.getLogger(RoleServiceImpl.class);

	@Autowired
	private RoleRepository repo;
 
	@Override
	public Optional<Role> findRoleByName(ERole role) throws RoleNotFoundException {
		Optional<Role> r = repo.findByName(role);
		loggers.info("findRoleByName");
		return r;
	}
 
	@Override
	public Optional<Role> findRoleById(Integer id) throws RoleNotFoundException {
		Optional<Role> role = repo.findById(id);
		loggers.info("findRoleById");
		return role;
	}
 
}