package com.project.fmsbms.security.payload.request;
import com.fasterxml.jackson.annotation.JsonRawValue;

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
public class SignupRequest {
 
	private String username;
	
	private String name;
	
	private String email;
	
	@JsonRawValue
	private Long phoneNumber;
	
	private String address;
	
	private String password;

}
