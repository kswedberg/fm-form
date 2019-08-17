const unspecifiedMsg = 'Unspecified error';
const unspecified = {
  status: 500,
  errors: [
    {
      msg: unspecifiedMsg,
    },
  ],
};

export const getAxiosErrorData = function(err) {
  return err.response && err.response.data || unspecified;
};

export const getAxiosErrors = function(err) {
  return getAxiosErrorData(err).errors || unspecified.errors;
};

export const getAxiosErrorMessage = (err, glue = '\n') => {
  const errors = getAxiosErrors(err);

  return !errors.length ? unspecifiedMsg : errors.map((e) => {
    return e.msg || e.message || e;
  }).join(glue);
};
