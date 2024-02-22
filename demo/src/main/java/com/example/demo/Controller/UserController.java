package com.example.demo.Controller;

import com.example.demo.Entity.User;
import com.example.demo.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserRepo userRepo;
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user){
        User user1 = this.userRepo.findByEmail(user.getEmail());
        if(user1.getPassword().equals(user.getPassword())){
            return ResponseEntity.ok(user1);
        }
        return ResponseEntity.badRequest().body("Invalid Credentials");

    }
}
