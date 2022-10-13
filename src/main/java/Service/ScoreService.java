/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Service;

import Model.Score;
import Repository.ScoreRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Andres Rodriguez
 */
@Service
public class ScoreService {
    @Autowired
    private ScoreRepository scoreRepository;

    public List<Score> getAll() {
        return (List<Score>) scoreRepository.getAll();
    }

    public Optional<Score> getScore(int id) {
        return scoreRepository.getScore(id);
    }

    public Score save(Score score) {
        if (score.getIdScore() == null) {
            return scoreRepository.save(score);
        } else {
            Optional<Score> scoreEncontrado = scoreRepository.getScore((int) score.getIdScore());
            if (scoreEncontrado.isEmpty()) {
                return scoreRepository.save(score);
            } else {
                return score;
            }
        }
    }

    public Score update(Score score) {
        if (score.getIdScore() != null) {
            Optional<Score> scoreEncontrado = scoreRepository.getScore((int) score.getIdScore());
            if (!scoreEncontrado.isEmpty()) {
                if (score.getMessageText() != null) {
                    scoreEncontrado.get().setMessageText(score.getMessageText());
                }
                if (score.getStars() != null) {
                    scoreEncontrado.get().setStars(score.getStars());
                }
                return scoreRepository.save(scoreEncontrado.get());
            }
        }
        return score;
    }

    public boolean delete(int Id) {
        Boolean resultado = getScore(Id).map(scorePorEliminar -> {
            scoreRepository.delete(scorePorEliminar);
            return true;
        }).orElse(false);

        return resultado;
    }

}
