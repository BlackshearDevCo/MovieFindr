import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import React, { forwardRef, useContext } from "react";
import { ThemeContext, Types } from "@/components/ThemeProvider";
import clsx from "clsx";
import { SunIcon } from "../SunIcon";

export function ThemeDropdown() {
  const { state, dispatch } = useContext(ThemeContext);

  return (
    <Menu>
      <MenuButton>
        <SunIcon />
        <p className="sr-only">Manage theme</p>
      </MenuButton>
      <MenuItems
        anchor="bottom end"
        className="z-50 border-2 border-secondary drop-shadow empty:invisible [--anchor-gap:4px] w-40 rounded bg-background"
      >
        <MenuItem
          as={ThemeDropdownItem}
          onClick={() => {
            dispatch({
              type: Types.SetDarkMode,
              payload: state.isDarkMode ? false : true,
            });
          }}
        >
          {state.isDarkMode ? "Light" : "Dark"} mode
        </MenuItem>
        <MenuItem
          as={ThemeDropdownItem}
          active={state.currentTheme === "classic"}
          onClick={() => {
            dispatch({
              type: Types.SetTheme,
              payload: "classic",
            });
          }}
        >
          Classic
        </MenuItem>
        <MenuItem
          as={ThemeDropdownItem}
          active={state.currentTheme === "amethyst"}
          onClick={() => {
            dispatch({
              type: Types.SetTheme,
              payload: "amethyst",
            });
          }}
        >
          Amethyst
        </MenuItem>
        <MenuItem
          as={ThemeDropdownItem}
          active={state.currentTheme === "frost"}
          onClick={() => {
            dispatch({
              type: Types.SetTheme,
              payload: "frost",
            });
          }}
        >
          Frost
        </MenuItem>
        <MenuItem
          as={ThemeDropdownItem}
          active={state.currentTheme === "ash"}
          onClick={() => {
            dispatch({
              type: Types.SetTheme,
              payload: "ash",
            });
          }}
        >
          Ash
        </MenuItem>
        <MenuItem
          as={ThemeDropdownItem}
          active={state.currentTheme === "sunset"}
          onClick={() => {
            dispatch({
              type: Types.SetTheme,
              payload: "sunset",
            });
          }}
        >
          Sunset
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}

type ThemeDropdownItemProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  onClick: () => void;
  active?: boolean;
};

// eslint-disable-next-line react/display-name
const ThemeDropdownItem = forwardRef(function (
  props: ThemeDropdownItemProps,
  ref: any
) {
  return (
    <button
      className={clsx(
        "block data-[focus]:bg-secondary data-[focus]:text-background px-4 py-2 font-medium w-full text-left",
        props.active ? "bg-secondary text-background" : ""
      )}
      ref={ref}
      {...props}
    />
  );
});
