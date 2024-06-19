package com.project.fmsbms.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name = "users_table", uniqueConstraints = { @UniqueConstraint(columnNames = "username") })
public class FamilyMember {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer memeberId;
	
	@ManyToOne
	private Family family;
	private String name;
	private String username;
	private String email;
	private long phoneNumber;
}
