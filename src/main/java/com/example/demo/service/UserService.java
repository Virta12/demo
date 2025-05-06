package com.example.demo.service;

import com.example.demo.repository.User;
import com.example.demo.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> UserLoad() {
        return userRepository.findAll();
    }

    public User create(User user) {
        Optional<User> optionalUser = userRepository.findByEmail(user.getEmail());

        if (optionalUser.isPresent()) {
            throw new IllegalStateException("User wich this email created");
        }
        user.setAge(Period.between(user.getBirth(), LocalDate.now()).getYears());
        return userRepository.save(user);
    }

    public void delete(Long id) {

        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isEmpty()) {
            throw new IllegalStateException("User with id: " + id + " don't find ");
        }
        userRepository.deleteById(id);

    }

    public void update(Long id, String name, String email) {

        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isEmpty()) {
            throw new IllegalStateException("User with id: " + id + " don't find ");
        }

        User user = optionalUser.get();

        if (email != null && !email.equals(user.getEmail())) {

            Optional<User> findByEmail = userRepository.findByEmail(email);

            if (findByEmail.isPresent()) {
                throw new IllegalStateException("User wich this email created");
            }
            user.setEmail(email);
        }

        if(name != null && !name.equals(user.getName())){

           user.setName(name);

        }
        userRepository.save(user);
    }
}
