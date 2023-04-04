import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { useOutsideAlerter } from "../../hooks/outsideClick.hook";
import { BadgeGroup } from "../BadgeGroup/BadgeGroup";
import { Checkbox } from "../Checkbox/Checkbox";
import { Input } from "../Input/Input";
import { ListItem } from "../ListItem/ListItem";
import { Tag } from "../Tag/Tag";

interface ISelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onChange"> {
  onChange?: (value: string | number) => void;
  label: string;
  hint?: string;
  error?: string[] | string | undefined;
  options: {
    key: string;
    value: any;
  }[];
  initialValue?: string | number;
}

interface IMultiSelectProps
  extends Omit<ISelectProps, "onChange" | "initialValue"> {
  onChange?: (value: string[] | number[]) => void;
  initialValue?: string[] | number[];
}

export const MultiSelect: FunctionComponent<IMultiSelectProps> = (props) => {
  const {
    label,
    id,
    required,
    options,
    onChange,
    initialValue,
    error,
    ...rest
  } = props;
  const dropdownRef = useRef(null);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  useOutsideAlerter(dropdownRef, () => setIsDropDownOpen(false));

  const [filteredOptions, setFilteredOptions] =
    useState<{ key: string; value: any }[]>(options);
  const [selectedOptions, setSelectedOptions] = useState<
    { key: string; value: any }[]
  >([]);

  useEffect(() => {
    if (onChange) {
      onChange(selectedOptions.map((el) => el.value));
    }
  }, [selectedOptions]);

  useEffect(() => {
    if (initialValue) {
      const initialOptions = options.filter((el) =>
        initialValue.includes(el.value as never)
      );
      if (initialOptions.length > 0) {
        setSelectedOptions(initialOptions);
      }
    }
  }, []);

  return (
    <div className="flex-1">
      <label
        htmlFor={id}
        className="block text-xs font-bold leading-5 text-gray-800"
      >
        {label}
        {required && <b className="text-red-500">*</b>}
      </label>
      <div className="my-1 rounded-md shadow-sm relative inline-block w-full focus:outline-none focus:shadow-outline-purple focus:border-purple-500">
        <div
          className="custom-select block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          onClick={() => {
            setFilteredOptions(options);
            setIsDropDownOpen(true);
          }}
        >
          {!selectedOptions.length && (
            <span className="text-gray-500">Select Categories</span>
          )}
          <BadgeGroup>
            {selectedOptions.map((option) => (
              <Tag
                key={option.value}
                onClick={() => {
                  setSelectedOptions(
                    selectedOptions.filter(
                      (selectedOption) => selectedOption.value !== option.value
                    )
                  );
                }}
              >
                {option.key}
              </Tag>
            ))}
          </BadgeGroup>
        </div>
        {isDropDownOpen && (
          <div
            ref={dropdownRef}
            className="bg-white shadow-xl z-20 absolute origin-top-left absolute right-0 left-0 border border-gray-200 rounded-lg"
            onMouseLeave={() => {
              setIsDropDownOpen(false);
            }}
          >
            <div className="p-2 py-1">
              <Input
                placeholder="Search for Category"
                onKeyUp={(event) => {
                  setFilteredOptions(
                    options.filter((option) =>
                      option.key
                        .toLocaleLowerCase()
                        .includes(
                          (
                            event.target as HTMLInputElement
                          ).value.toLocaleLowerCase()
                        )
                    )
                  );
                }}
              />
              <div className="mb-2"></div>
              <div className="max-h-56 overflow-y-scroll">
                {filteredOptions.map((option) => {
                  return (
                    <div
                      className="px-2 hover:bg-gray-50 rounded"
                      key={option.value}
                    >
                      <Checkbox
                        label={option.key}
                        text={option.key}
                        value={option.key}
                        showLabel={false}
                        checked={selectedOptions.some(
                          (selectedOption) =>
                            selectedOption.value === option.value
                        )}
                        onChange={() => {
                          if (
                            selectedOptions.some(
                              (selectedOption) =>
                                selectedOption.value === option.value
                            )
                          ) {
                            setSelectedOptions(
                              selectedOptions.filter(
                                (selectedOption) =>
                                  selectedOption.value !== option.value
                              )
                            );
                          } else {
                            setSelectedOptions([...selectedOptions, option]);
                          }
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
      {error && typeof error === "object" ? (
        error.map((err, i) => (
          <div key={i} className="text-xs text-red-500">
            {err}
          </div>
        ))
      ) : (
        <div className="text-xs text-red-500">{error}</div>
      )}
    </div>
  );
};

export const Select: FunctionComponent<ISelectProps> = (props) => {
  const { label, id, required, options, onChange, initialValue, ...rest } =
    props;
  const dropdownRef = useRef(null);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  useOutsideAlerter(dropdownRef, () => setIsDropDownOpen(false));

  const [filteredOptions, setFilteredOptions] =
    useState<{ key: string; value: any }[]>(options);
  const [selectedOption, setSelectedOption] = useState<{
    key: string;
    value: any;
  }>(options[0]);

  useEffect(() => {
    if (onChange) {
      onChange(selectedOption.value);
    }
  }, [selectedOption]);

  useEffect(() => {
    if (initialValue && options) {
      const opt = options.find((option) => option.value === initialValue);
      if (opt) {
        setSelectedOption(opt);
      }
    }
  }, []);

  return (
    <div className="flex-1">
      <label
        htmlFor={id}
        className="block text-xs font-bold leading-5 text-gray-800"
      >
        {label}
        {required && <b className="text-red-500">*</b>}
      </label>
      <div className="my-1 rounded-md shadow-sm relative inline-block w-full focus:outline-none focus:shadow-outline-purple focus:border-purple-500">
        <div
          className="custom-select block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          onClick={() => {
            setFilteredOptions(options);
            setIsDropDownOpen(true);
          }}
        >
          {!selectedOption && (
            <span className="text-gray-500">Select {label}</span>
          )}
          {selectedOption && <span>{selectedOption.key}</span>}
        </div>
        {isDropDownOpen && (
          <div
            ref={dropdownRef}
            className="bg-white shadow-xl z-20 absolute origin-top-left absolute right-0 left-0 border border-gray-200 rounded-lg"
            onMouseLeave={() => {
              setIsDropDownOpen(false);
            }}
          >
            <div className="p-2 py-1">
              <Input
                placeholder={`Search for ${label}`}
                onKeyUp={(event) => {
                  setFilteredOptions(
                    options.filter((option) =>
                      option.key
                        .toLocaleLowerCase()
                        .includes(
                          (
                            event.target as HTMLInputElement
                          ).value.toLocaleLowerCase()
                        )
                    )
                  );
                }}
              />
              <div className="mb-2"></div>
              <div className="max-h-56 overflow-y-scroll">
                {filteredOptions.map((option) => {
                  return (
                    <ListItem
                      key={option.value}
                      text={option.key}
                      onClick={() => {
                        setSelectedOption(option);
                        setIsDropDownOpen(false);
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
      {props.hint && <div className="text-xs text-gray-500">{props.hint}</div>}
      {props.error && typeof props.error === "object" ? (
        props.error.map((err, i) => (
          <div key={i} className="text-xs text-red-500">
            {err}
          </div>
        ))
      ) : (
        <div className="text-xs text-red-500">{props.error}</div>
      )}
    </div>
  );
};
