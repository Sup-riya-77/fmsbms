package com.project.fmsbms.service;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.fmsbms.entities.ERole;
import com.project.fmsbms.entities.Role;
import com.project.fmsbms.entities.UserEntity;
import com.project.fmsbms.repositories.UserEntityRepository;

@Service
public class UserEntityServiceImpl implements UserEntityService {
	private static final Logger loggers = LoggerFactory.getLogger(UserEntityServiceImpl.class);

	@Autowired
	UserEntityRepository repo;
	@Override
	public String updateRole(Integer userId, Role role) {
		Optional<UserEntity> user= repo.findById(userId);
		if(user.isPresent())
		{
		  user.get().setRole(role);
		  repo.save(user.get());
		  loggers.info("updateRole");
		  return "Role Updated Successfully!!!";
		}
		return null;
	}
 
	@Override
	public UserEntity addUserEntity(UserEntity user) {
		UserEntity userEntity=repo.save(user);
		loggers.info("addUserEntity");
		return userEntity;
	}
 
	@Override
	public Optional<UserEntity> findByUsername(String username) {
		Optional<UserEntity>  user =repo.findByUsername(username);
		loggers.info("findByUserName");
		return user;
	}
 
	@Override
	public Boolean existsByUsername(String username) {
		Boolean b=repo.existsByUsername(username);
		loggers.info("existsByUsername");
		return b;
	}
 
	@Override
	public Optional<UserEntity> findByRole(ERole role) {
		 Optional<UserEntity>  user =repo.findByRole(role);
		 loggers.info("findByRole");
		return user;
	}

	@Override
	public UserEntity findUserById(Integer id) {
		Optional<UserEntity> user = repo.findById(id);
		loggers.info("findUserById");
		return user.get();
	}

	@Override
	public UserEntity updateUserEntity(UserEntity userEntity) {
		UserEntity user = repo.save(userEntity);
		loggers.info("updateUserEntity");
		return user;
	}

	@Override
	public List<UserEntity> getAllUserEntity() {
		List<UserEntity> users= (List<UserEntity>) repo.findAll();
		return users;
	}
}