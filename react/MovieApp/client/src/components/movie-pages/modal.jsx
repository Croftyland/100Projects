import React from "react";
import { withFormik, Field, FieldArray } from "formik";

import * as Yup from "yup";

import { connect } from "react-redux";
import classNames from "classnames";
import { onSubmitOne } from "../../actions";

const InputFeedback = ({ error }) =>
  error ? <div className={classNames("input-feedback")}>{error}</div> : null;

const RadioButtonGroup = ({
  value,
  error,
  touched,
  id,
  label,
  className,
  children,
}) => {
  const classes = classNames(
    "toggle",
    {
      "is-success": value || (!error && touched), // handle prefilled or user-filled
      "is-error": !!error && touched,
    },
    className
  );

  return (
    <div className={classes}>
      <fieldset>
        <p>{label}</p>
        {children}
        {touched && <InputFeedback error={error} />}
      </fieldset>
    </div>
  );
};

const RadioButton = ({
  field: { name, value, onChange, onBlur },
  id,
  label,
  className,
  ...props
}) => {
  return (
    <div className="inline-radio">
      <input
        name={name}
        id={id}
        type="radio"
        value={id}
        checked={id === value}
        onChange={onChange}
        onBlur={onBlur}
        className={classNames("toggle__input")}
        {...props}
      />
      <label className="toggle__label" htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

const ModalForm = (props) => {
  const {
    values,
    touched,
    errors,
    dirty,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
  } = props;
  return (
    <div className="fill-form">
      <form onSubmit={handleSubmit}>
        <p>Hi User,</p>
        <p>
          Your film <label htmlFor="title">title </label> is
          <input
            id="title"
            placeholder="(your title here)"
            type="text"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            className={
              errors.title && touched.title ? "text-input error" : "text-input"
            }
          />{" "}
          and{" "}
        </p>
        {errors.title && touched.title && (
          <div className="input-feedback">{errors.title}</div>
        )}
        <p>
          it <label htmlFor="year">was filmed</label> in
          <input
            id="year"
            placeholder="(year)"
            type="text"
            value={values.year}
            onChange={handleChange}
            onBlur={handleBlur}
            className={
              errors.year && touched.year ? "text-input error" : "text-input"
            }
          />
        </p>
        {errors.year && touched.year && (
          <div className="input-feedback">{errors.year}</div>
        )}
        <RadioButtonGroup
          id="format"
          label="One of these please"
          value={values.format}
          error={errors.format}
          touched={touched.format}
        >
          <Field component={RadioButton} name="format" id="VHS" label="VHS" />
          <Field
            component={RadioButton}
            name="format"
            id="Blu-Ray"
            label="Blu-Ray"
          />
          <Field component={RadioButton} name="format" id="DVD" label="DVD" />
        </RadioButtonGroup>

        <FieldArray
          name="stars"
          render={(arrayHelpers) => (
            <div>
              {values.stars && values.stars.length > 0 ? (
                values.stars.map((index) => (
                  <div key={index}>
                    <label htmlFor="stars">Name of star</label>
                    <Field name={`stars.${index}`} />
                    <button
                      className="add-button"
                      type="button"
                      onClick={() => arrayHelpers.insert(index)}
                    >
                      Add
                    </button>
                    <button
                      className="remove-button"
                      type="button"
                      onClick={() => arrayHelpers.remove(index, "")}
                    >
                      Remove
                    </button>
                  </div>
                ))
              ) : (
                <button
                  className="add-button"
                  type="button"
                  onClick={() => arrayHelpers.push("")}
                >
                  Add a star
                </button>
              )}
            </div>
          )}
        />
        <button
          type="button"
          className="outline"
          onClick={handleReset}
          disabled={!dirty || isSubmitting}
        >
          Reset
        </button>
        <button type="submit" className="submit-button" disabled={isSubmitting}>
          Submit
        </button>
      </form>
    </div>
  );
};

const EnhancedForm = withFormik({
  mapPropsToValues: () => ({
    title: "",
    year: "",
    format: "",
    stars: [""],
  }),
  validationSchema: Yup.object().shape({
    title: Yup.string()
      .max(28, "Must be 2 characters or less")
      .required("Required"),
    year: Yup.number().min(4, "Min 4 chars").required("Please supply year"),
    format: Yup.string().required("A radio option is required"),
    actors: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().max(28, "Max 28 chars"),
        name: Yup.string().min(2, "Min 2 chars"),
      })
    ),
  }),
  handleSubmit(values, { props, setSubmitting }) {
    props.dispatch(onSubmitOne(values));
    setSubmitting(false);
  },
})(ModalForm);

const Modal = connect()(EnhancedForm);

export default Modal;
