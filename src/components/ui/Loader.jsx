import classes from "./Loader.module.css";

function Loader() {
  return (
    <div className={classes["loader-container"]}>
      <div className={classes["three-body"]}>
        <div className={classes["three-body__dot"]}></div>
        <div className={classes["three-body__dot"]}></div>
        <div className={classes["three-body__dot"]}></div>
      </div>
    </div>
  );
}

export default Loader;
