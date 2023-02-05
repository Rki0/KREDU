// import { useCallback, useReducer } from "react";

// const formReducer = (state: any, action: any) => {
//   switch (action.type) {
//     case "INPUT_CHANGE":
//       let formIsValid = true;

//       for (const inputId in state.inputs) {
//         if (!state.inputs[inputId]) {
//           continue;
//         }

//         if (inputId === action.inputId) {
//           formIsValid = formIsValid && action.isValid;
//         } else {
//           formIsValid = formIsValid && state.inputs[inputId].isValid;
//         }
//       }

//       return {
//         ...state,
//         inputs: {
//           ...state.inputs,
//           [action.inputId]: {
//             value: action.value,
//             isValid: action.isValid,
//           },
//         },
//         isValid: formIsValid,
//       };

//     default:
//       return state;
//   }
// };

// export const useForm = (initialInputs: any, initialFormValidity: any) => {
//   const [formState, dispatch] = useReducer(formReducer, {
//     inputs: initialInputs,
//     isValid: initialFormValidity,
//   });

//   const inputHandler = useCallback(
//     (id: string, value: string, isValid: boolean) => {
//       dispatch({
//         type: "INPUT_CHANGE",
//         value: value,
//         isValid: isValid,
//         inputId: id,
//       });
//     },
//     []
//   );

//   return [formState, inputHandler];
// };

import { useCallback, useReducer } from "react";

const formReducer = (state: any, action: any) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;

      for (const inputId in state.inputs) {
        if (!state.inputs[inputId]) {
          continue;
        }

        if (action.isValid !== null) {
          if (inputId === action.inputId) {
            formIsValid = formIsValid && action.isValid;
          } else {
            formIsValid = formIsValid && state.inputs[inputId].isValid;
          }
        }
      }

      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: {
            value: action.value,
            isValid: action.isValid,
          },
        },
        isValid: formIsValid,
      };

    default:
      return state;
  }
};

export const useForm = (initialInputs: any, initialFormValidity: any) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity,
  });

  const inputHandler = useCallback(
    (id: string, value: string, isValid: boolean | null) => {
      dispatch({
        type: "INPUT_CHANGE",
        value: value,
        isValid: isValid || null,
        inputId: id,
      });
    },
    []
  );

  return [formState, inputHandler];
};
