package com.example.demo.controller;

import com.example.demo.repository.User;
import com.example.demo.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "home/myProfile")
public class UserController {


   private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> UserLoad(){
        return userService.UserLoad();
    }

    @PostMapping
    public User create(@RequestBody User user){
        return userService.create(user);
    }

    @DeleteMapping(path = "{id}")
    public void delete(@PathVariable Long id){

    userService.delete(id);

    }

    @PutMapping(path = "{id}")
    public void update(@PathVariable Long id,
                       @RequestParam(required = false) String name,
                       @RequestParam(required = false) String email){

        userService.update(id,name,email);
    }
}
