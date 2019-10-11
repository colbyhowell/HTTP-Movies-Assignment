import React from "react";
import useForm from "react-hook-form";
import axios from "axios";

function UpdateMovie(props) {
  const id = props.match.params.id;

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = values => {
    const starsArr = [values.stars1, values.stars2, values.stars3];
    values.id = id;
    values.stars = starsArr;
    axios
      .put(`http://localhost:5000/api/movies/${id}`, values)
      .then(res => {
        console.log(res);
        props.history.push("/");
      })
      .catch(err => console.log(err, values));
  };
  console.log(props.match.params);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="title" name="title" ref={register} />
      <input
        type="text"
        placeholder="director"
        name="director"
        value={props.match.params.title}
        ref={register}
      />
      <input
        type="number"
        placeholder="metascore"
        name="metascore"
        ref={register}
      />
      <input type="text" placeholder="stars" name="stars1" ref={register} />
      <input type="text" placeholder="stars" name="stars2" ref={register} />
      <input type="text" placeholder="stars" name="stars3" ref={register} />
      <input type="submit" />
    </form>
  );
}

export default UpdateMovie;
