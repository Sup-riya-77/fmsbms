package com.project.fmsbms.controller;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.fmsbms.entities.ERole;
import com.project.fmsbms.entities.Role;
import com.project.fmsbms.entities.UserEntity;
import com.project.fmsbms.exceptions.RoleNotFoundException;
import com.project.fmsbms.repositories.UserEntityRepository;
import com.project.fmsbms.security.jwt.JwtUtils;
import com.project.fmsbms.security.payload.request.LoginRequest;
import com.project.fmsbms.security.payload.request.SignupRequest;
import com.project.fmsbms.security.payload.response.JwtResponse;
import com.project.fmsbms.security.payload.response.MessageResponse;
import com.project.fmsbms.security.service.UserDetailsImpl;
import com.project.fmsbms.security.service.UserDetailsServiceImpl;
import com.project.fmsbms.service.RoleService;

import jakarta.validation.Valid;
 
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AuthController {
	private static final Logger loggers = LoggerFactory.getLogger(AuthController.class);
 
	@Autowired
	private AuthenticationManager authenticationManager;
 
	@Autowired
	private JwtUtils jwtUtils;
 
	@Autowired
	private UserEntityRepository userEntityRepo;
 
	@Autowired
	private RoleService roleService;
 
	@Autowired
	private PasswordEncoder passwordEncoder;
 
 
	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
 
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
 
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);
 
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		String role = userDetails.getAuthorities().stream().findFirst() // Get the first authority
				.map(item -> item.getAuthority()) // Map it to its authority string
				.orElse(null);
 
		JwtResponse jwtResponse = new JwtResponse(jwt, userDetails.getId(), userDetails.getUsername(), userDetails.getEmail(),
				userDetails.getPhoneNumber(),role,userDetails.getUsername());
		
		loggers.info("signin");
		return ResponseEntity.ok(jwtResponse);
	}
 
	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) throws RoleNotFoundException {
		if (userEntityRepo.existsByUsername(signUpRequest.getUsername())) {
			return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
		}
 
		
		// Create new user's account
		UserEntity user = new UserEntity();
		user.setUsername(signUpRequest.getUsername());
		user.setName(signUpRequest.getName());
		user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
		user.setEmail(signUpRequest.getEmail());
		user.setPhoneNumber(signUpRequest.getPhoneNumber());
		user.setAddress(signUpRequest.getAddress());
		Optional<Role> role = roleService.findRoleByName(ERole.ROLE_DEFAULT);
		if (role.isPresent()) {
			user.setRole(role.get());
		}
		userEntityRepo.save(user);
		loggers.info("signup");
		return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
	}
 
}