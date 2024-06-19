package com.project.fmsbms.service;

import java.util.List;
import java.util.Optional;

import com.project.fmsbms.entities.ERole;
import com.project.fmsbms.entities.Role;
import com.project.fmsbms.entities.UserEntity;

public interface UserEntityService {
 
	public UserEntity addUserEntity(UserEntity user);
	
	public UserEntity findUserById(Integer id);
 
	public String updateRole(Integer userId, Role role);
 
	public Optional<UserEntity> findByUsername(String username);
 
	public Boolean existsByUsername(String username);
 
	public Optional<UserEntity> findByRole(ERole role);
	
	public UserEntity updateUserEntity(UserEntity userEntity);
	
	public List<UserEntity> getAllUserEntity();
}