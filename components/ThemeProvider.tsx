import { createContext, useEffect, useReducer } from "react";

type Theme = "classic" | "amethyst" | "frost" | "ash" | "sunset";

type InitialStateType = {
  isDarkMode: boolean;
  currentTheme: Theme;
};

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum Types {
  SetDarkMode = "SET_DARK_MODE",
  SetTheme = "SET_THEME",
}

type ThemePayload = {
  [Types.SetDarkMode]: boolean;
  [Types.SetTheme]: Theme;
};

export type ThemeActions =
  ActionMap<ThemePayload>[keyof ActionMap<ThemePayload>];

const initialState: InitialStateType = {
  isDarkMode: false,
  currentTheme: "classic",
};

const updateDarkMode = (darkMode: boolean) => {
  localStorage.setItem("isDarkMode", String(darkMode));
  darkMode
    ? document!.querySelector("body")!.classList.add("dark")
    : document!.querySelector("body")!.classList.remove("dark");
};

const updateTheme = (theme: Theme) => {
  localStorage.setItem("theme", theme);
  // TODO: Refactor to not be trash
  document!.querySelector("body")!.classList.remove("classic");
  document!.querySelector("body")!.classList.remove("amethyst");
  document!.querySelector("body")!.classList.remove("frost");
  document!.querySelector("body")!.classList.remove("ash");
  document!.querySelector("body")!.classList.remove("sunset");
  document!.querySelector("body")!.classList.add(theme);
};

export const themeReducer = (state: InitialStateType, action: ThemeActions) => {
  switch (action.type) {
    case "SET_DARK_MODE":
      updateDarkMode(action.payload);
      return {
        ...state,
        isDarkMode: action.payload,
      };
    case "SET_THEME":
      updateTheme(action.payload);
      return {
        ...state,
        currentTheme: action.payload,
      };
    default:
      return state;
  }
};

export const ThemeContext = createContext<{
  state: InitialStateType;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  console.log(state);

  function isDarkModeLocalStorageEmpty(): boolean {
    return !localStorage.getItem("isDarkMode");
  }

  function isThemeLocalStorageEmpty(): boolean {
    return !localStorage.getItem("theme");
  }

  useEffect(() => {
    // Handle Theme
    if (isThemeLocalStorageEmpty()) {
      dispatch({
        type: Types.SetTheme,
        payload: "classic",
      });
    } else {
      const themeStorage: any = localStorage.getItem("theme");
      const theme: Theme = themeStorage ?? "";
      dispatch({
        type: Types.SetTheme,
        payload: theme,
      });
    }

    // Handle Dark Mode
    if (isDarkModeLocalStorageEmpty()) {
      dispatch({
        type: Types.SetDarkMode,
        payload: false,
      });
    } else {
      const darkModeStorage = localStorage.getItem("isDarkMode");
      const isDarkMode: boolean = darkModeStorage
        ? JSON.parse(darkModeStorage)
        : "";
      dispatch({
        type: Types.SetDarkMode,
        payload: isDarkMode,
      });
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      {children}
    </ThemeContext.Provider>
  );
};
