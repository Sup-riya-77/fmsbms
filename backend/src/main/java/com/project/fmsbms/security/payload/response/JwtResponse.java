package com.project.fmsbms.security.payload.response;

import com.project.fmsbms.entities.Role;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
 
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class JwtResponse {
	private String accessToken;
	private String tokenType = "Bearer";
	private Integer id;
	private String name;
	private String email;
	private Long phoneNumber;
	private String role;
	private String username;
 
	public JwtResponse(String accessToken, Integer id, String name, String email, Long phoneNumber, String role,String username) {
		this.accessToken = accessToken;
		this.id = id;
		this.name = name;
		this.email = email;
		this.phoneNumber = phoneNumber;
		this.role = role;
		this.username= username;
	}
}