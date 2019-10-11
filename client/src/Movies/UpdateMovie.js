import React, { useState, useEffect } from "react";
import useForm from "react-hook-form";
import axios from "axios";

function UpdateMovie({ match, history }) {
  const id = match.params.id;

  const { register, handleSubmit, errors } = useForm();

  const [movies, setMovies] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovies(res.data))
      .catch(err => console.log(err));
  }, []);

  const onSubmit = values => {
    values.stars = values.stars.split(",");
    values.id = id;
    axios
      .put(`http://localhost:5000/api/movies/${id}`, values)
      .then(res => {
        console.log(res);
        history.push("/");
      })
      .catch(err => console.log(err, values));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="title"
        name="title"
        ref={register}
        defaultValue={movies.title}
      />
      <input
        type="text"
        placeholder="director"
        name="director"
        defaultValue={movies.director}
        ref={register}
      />
      <input
        type="number"
        placeholder="metascore"
        name="metascore"
        defaultValue={movies.metascore}
        ref={register}
      />
      <input
        type="text"
        placeholder="stars"
        name="stars"
        ref={register}
        defaultValue={movies.stars}
      />
      <input type="submit" />
    </form>
  );
}

export default UpdateMovie;
