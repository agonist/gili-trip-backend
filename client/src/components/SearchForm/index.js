import React from "react";
import PropTypes from "prop-types";
import DayPicker from "react-day-picker";
import { Form, Field } from "react-final-form";
import date from "date-fns";
import {
  Autocomplete,
  Button,
  IconButton,
  Pane,
  Popover,
  Radio,
  TextInputField,
  majorScale,
} from "evergreen-ui";

import {
  DATE_FORMAT,
  LOCATIONS,
  TODAY_DATE,
  TRAVEL_TYPES,
} from "../../constants";

const formatLocations = locations => locations.map(({ name }) => name);

const itemHeight = majorScale(5);

const inputProps = {
  inputHeight: itemHeight,
  marginBottom: 0,
};

const paneProps = {
  marginRight: majorScale(1),
};

const radioProps = {
  size: 16,
  marginRight: majorScale(2),
};

const required = value => (value ? undefined : "Required");

const swapMutator = (_, { fields, formState }) => {
  const { from, to } = fields;
  const { values } = formState;

  to.change(values.from);
  from.change(values.to);
};

const SearchForm = ({ formData, isLoading, onSubmit }) => (
  <Form
    onSubmit={onSubmit}
    mutators={{ swap: swapMutator }}
    initialValues={{
      travel_type: TRAVEL_TYPES.ROUND,
      ...formData,
    }}
  >
    {({ form, handleSubmit, submitting, values }) => {
      const isArrivalDateDisabled = values.travel_type === TRAVEL_TYPES.ONE_WAY;

      return (
        <form onSubmit={handleSubmit}>
          <Pane display="flex">
            <Field name="travel_type" type="radio" value={TRAVEL_TYPES.ROUND}>
              {({ input }) => (
                <Radio label="Round trip" {...input} {...radioProps} />
              )}
            </Field>

            <Field name="travel_type" type="radio" value={TRAVEL_TYPES.ONE_WAY}>
              {({ input }) => (
                <Radio label="One way" {...input} {...radioProps} />
              )}
            </Field>
          </Pane>

          <Pane display="flex" alignItems="flex-end">
            <Field name="from" validate={required}>
              {({ input, meta }) => (
                <Pane flexGrow={1} {...paneProps}>
                  <Autocomplete
                    {...input}
                    itemSize={itemHeight}
                    items={formatLocations(LOCATIONS)}
                    selectedItem={input.value}
                  >
                    {({ getInputProps, getRef, inputValue, openMenu }) => (
                      <TextInputField
                        {...inputProps}
                        {...getInputProps({ onFocus: openMenu })}
                        label="From"
                        required
                        placeholder="Bali, Bangkok..."
                        value={inputValue}
                        innerRef={getRef}
                        isInvalid={meta.error && meta.touched}
                      />
                    )}
                  </Autocomplete>
                </Pane>
              )}
            </Field>

            <Pane className="swap-locations" {...paneProps}>
              <IconButton
                icon="swap-horizontal"
                height={itemHeight}
                appearance="minimal"
                type="button"
                onClick={form.mutators.swap}
              />
            </Pane>

            <Field name="to" validate={required}>
              {({ input, meta }) => (
                <Pane flexGrow={1} {...paneProps}>
                  <Autocomplete
                    {...input}
                    itemSize={itemHeight}
                    items={formatLocations(LOCATIONS)}
                    selectedItem={input.value}
                  >
                    {({ getInputProps, getRef, inputValue, openMenu }) => (
                      <TextInputField
                        {...inputProps}
                        {...getInputProps({ onFocus: openMenu })}
                        label="To"
                        required
                        placeholder="Bali, Bangkok..."
                        value={inputValue}
                        innerRef={getRef}
                        isInvalid={meta.error && meta.touched}
                      />
                    )}
                  </Autocomplete>
                </Pane>
              )}
            </Field>

            <Field name="departure_date" validate={required}>
              {({ input: { value, ...input }, meta }) => (
                <Popover
                  content={({ close }) => (
                    <DayPicker
                      {...input}
                      selectedDays={[value, values.arrival_date]}
                      disabledDays={{ before: TODAY_DATE }}
                      onDayClick={day => {
                        input.onChange(day);
                        close();
                      }}
                    />
                  )}
                >
                  <Pane {...paneProps}>
                    <TextInputField
                      {...input}
                      {...inputProps}
                      label="Departure"
                      placeholder="15/12/2018"
                      required
                      readOnly
                      value={value && date.format(value, DATE_FORMAT)}
                      isInvalid={meta.error && meta.touched}
                    />
                  </Pane>
                </Popover>
              )}
            </Field>

            <Field
              name="arrival_date"
              validate={isArrivalDateDisabled ? null : required}
            >
              {({ input: { value, ...input }, meta }) => {
                const inputValue = isArrivalDateDisabled
                  ? ""
                  : value && date.format(value, DATE_FORMAT);

                const renderPane = (
                  <Pane {...paneProps}>
                    <TextInputField
                      {...inputProps}
                      label="Arrival"
                      placeholder={isArrivalDateDisabled ? "-" : "18/12/2018"}
                      required={!isArrivalDateDisabled}
                      readOnly
                      disabled={isArrivalDateDisabled}
                      isInvalid={meta.error && meta.touched}
                      value={inputValue}
                    />
                  </Pane>
                );

                return isArrivalDateDisabled ? (
                  renderPane
                ) : (
                  <Popover
                    content={({ close }) => (
                      <DayPicker
                        selectedDays={[value, values.departure_date]}
                        disabledDays={{
                          before: values.departure_date || TODAY_DATE,
                        }}
                        onDayClick={day => {
                          input.onChange(day);
                          close();
                        }}
                      />
                    )}
                  >
                    {renderPane}
                  </Popover>
                );
              }}
            </Field>

            <Pane className="submit" {...paneProps} flexShrink={0}>
              <Button
                height={itemHeight}
                appearance="primary"
                isLoading={submitting || isLoading}
                type="submit"
              >
                Search tickets
              </Button>
            </Pane>
          </Pane>
        </form>
      );
    }}
  </Form>
);

SearchForm.propTypes = {
  formData: PropTypes.shape({}),
  isLoading: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
};

SearchForm.defaultProps = {
  formData: {},
  isLoading: false,
};

export default SearchForm;
