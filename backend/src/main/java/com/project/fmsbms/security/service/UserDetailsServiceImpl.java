package com.project.fmsbms.security.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.fmsbms.entities.UserEntity;
import com.project.fmsbms.repositories.UserEntityRepository;
 
 
@Service
public class UserDetailsServiceImpl implements UserDetailsService {
	@Autowired
	private UserEntityRepository userEntityRepository;
 
	@Override
	@Transactional
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		UserEntity user = userEntityRepository.findByUsername(username)
				.orElseThrow(() -> new UsernameNotFoundException("User not found with name : " + username));
		return UserDetailsImpl.build(user);
	}
 
}