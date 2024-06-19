package com.project.fmsbms.security.service;

 
import java.util.Collection;
import java.util.List;
import java.util.Objects;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.project.fmsbms.entities.UserEntity;
 
public class UserDetailsImpl implements UserDetails {

	private static final long serialVersionUID = 1L;
 
	private Integer id;
	private String username;
	private Long phoneNumber; 
	private String email;
	@JsonIgnore
	private String password;
	private String address;
 
	private GrantedAuthority authority;

 
 
	public UserDetailsImpl(Integer id, String username, String email, String address,long phoneNumber,String password, GrantedAuthority authority) {
		this.id = id;
		this.username = username;
		this.address = address;
		this.email = email;
		this.phoneNumber = phoneNumber;
		this.password = password;
		this.authority = authority;
		
	}

	public static UserDetailsImpl build(UserEntity user) {
		GrantedAuthority authority = new SimpleGrantedAuthority(user.getRole().getName().name());
		return new UserDetailsImpl(user.getId(), user.getUsername(), user.getEmail(), user.getAddress() ,user.getPhoneNumber(),user.getPassword(),authority);

	}
 
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return List.of(authority); // Returns a list with a single authority
	}
 
	public Integer getId() {
		return id;
	}

 
	@Override
	public String getPassword() {
		return password;
	}
 
	@Override
	public String getUsername() {
		return username;
	}
	
	public String getAddress() {
		return address;
	}
	
	public String getEmail() {
		return email;
	}
	
	public Long getPhoneNumber() {
		return phoneNumber;
	}
 
	@Override
	public boolean isAccountNonExpired() {
		return true;
	}
 
	@Override
	public boolean isAccountNonLocked() {
		return true;
	}
 
	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}
 
	@Override
	public boolean isEnabled() {
		return true;
	}
 
	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		UserDetailsImpl user = (UserDetailsImpl) o;
		return Objects.equals(id, user.id);
	}

}