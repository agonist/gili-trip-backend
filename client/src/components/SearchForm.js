import React from "react";
import PropTypes from "prop-types";
import DayPicker from "react-day-picker";
import { Form, Field } from "react-final-form";
import dateFns from "date-fns";
import {
  Button,
  IconButton,
  Pane,
  Popover,
  Radio,
  SelectField,
  TextInputField,
  majorScale,
} from "evergreen-ui";

import {
  DATE_FORMAT,
  ITEM_HEIGHT,
  ITEM_SPACE,
  LOCATIONS,
  TODAY_DATE,
  TRAVEL_TYPES,
} from "../constants";

const inputProps = {
  inputHeight: ITEM_HEIGHT,
  marginBottom: 0,
};

const paneProps = {
  marginRight: majorScale(1),
};

const radioProps = {
  size: 16,
  marginRight: ITEM_SPACE,
};

const DEFAULT_DEPARTURE_ID = 1;
const DEFAULT_ARRIVAL_ID = 3;
const DEFAULT_QUANTITY = 1;

const hasReturn = travel_type => travel_type === TRAVEL_TYPES.ROUND;
const formatDate = date => dateFns.format(date, DATE_FORMAT);
const required = value => (value ? undefined : "Required");

const renderLocations = () =>
  LOCATIONS.map(({ id, name }) => (
    <option key={id} value={id}>
      {name}
    </option>
  ));

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
      from: DEFAULT_DEPARTURE_ID,
      to: DEFAULT_ARRIVAL_ID,
      quantity: DEFAULT_QUANTITY,
      travel_type: TRAVEL_TYPES.ROUND,
      ...formData,
    }}
  >
    {({
      form,
      handleSubmit,
      submitting,
      values: { arrival_date, departure_date, travel_type },
    }) => (
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <Pane display="flex">
          <Field name="travel_type" type="radio" value={TRAVEL_TYPES.ONE_WAY}>
            {({ input }) => (
              <Radio label="One way" {...input} {...radioProps} />
            )}
          </Field>
          <Field name="travel_type" type="radio" value={TRAVEL_TYPES.ROUND}>
            {({ input }) => (
              <Radio label="Round trip" {...input} {...radioProps} />
            )}
          </Field>
        </Pane>

        <Pane display="flex" alignItems="flex-end">
          <Field name="from" validate={required}>
            {({ input, meta }) => (
              <Pane flexGrow={1} {...paneProps}>
                <SelectField
                  {...input}
                  {...inputProps}
                  required
                  label="From"
                  isInvalid={meta.error && meta.touched}
                >
                  {renderLocations()}
                </SelectField>
              </Pane>
            )}
          </Field>

          <Pane className="swap-locations" {...paneProps}>
            <IconButton
              icon="swap-horizontal"
              height={ITEM_HEIGHT}
              appearance="minimal"
              type="button"
              onClick={form.mutators.swap}
            />
          </Pane>

          <Field name="to" validate={required}>
            {({ input, meta }) => (
              <Pane flexGrow={1} {...paneProps}>
                <SelectField
                  {...input}
                  {...inputProps}
                  required
                  label="To"
                  isInvalid={meta.error && meta.touched}
                >
                  {renderLocations()}
                </SelectField>
              </Pane>
            )}
          </Field>

          <Field name="departure_date" validate={required}>
            {({ input: { value, ...input }, meta }) => (
              <Popover
                content={({ close }) => (
                  <DayPicker
                    {...input}
                    selectedDays={[
                      value,
                      hasReturn(travel_type) && arrival_date,
                    ]}
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
                    placeholder={formatDate(TODAY_DATE)}
                    required
                    readOnly
                    value={value && formatDate(value)}
                    isInvalid={meta.error && meta.touched}
                  />
                </Pane>
              </Popover>
            )}
          </Field>

          {hasReturn(travel_type) && (
            <Field name="arrival_date" validate={required}>
              {({ input: { value, ...input }, meta }) => (
                <Popover
                  content={({ close }) => (
                    <DayPicker
                      selectedDays={[value, departure_date]}
                      disabledDays={{
                        before: departure_date || TODAY_DATE,
                      }}
                      onDayClick={day => {
                        input.onChange(day);
                        close();
                      }}
                    />
                  )}
                >
                  <Pane {...paneProps}>
                    <TextInputField
                      {...inputProps}
                      label="Return"
                      placeholder={formatDate(dateFns.addDays(TODAY_DATE, 7))}
                      required
                      readOnly
                      isInvalid={meta.error && meta.touched}
                      value={value && formatDate(value)}
                    />
                  </Pane>
                </Popover>
              )}
            </Field>
          )}

          <Field name="quantity" validate={required}>
            {({ input, meta }) => (
              <Pane {...paneProps} minWidth={80} flexShrink={0}>
                <SelectField
                  {...input}
                  {...inputProps}
                  required
                  label="Quantity"
                  isInvalid={meta.error && meta.touched}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                </SelectField>
              </Pane>
            )}
          </Field>

          <Pane className="submit" {...paneProps} flexShrink={0}>
            <Button
              height={ITEM_HEIGHT}
              appearance="primary"
              isLoading={submitting || isLoading}
              type="submit"
            >
              Search trips
            </Button>
          </Pane>
        </Pane>
      </form>
    )}
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
