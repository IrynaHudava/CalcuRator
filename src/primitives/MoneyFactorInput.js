import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import NumberFormat from 'react-number-format';

function MoneyFactorFormat(props) {
    const { inputRef, onChange, ...other } = props;
    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={values => {
                onChange({
                    target: {
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            decimalScale={6}
        />
    );
}

MoneyFactorFormat.propTypes = {
    inputRef: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};

export class MoneyFactorInput extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        const { onChange, value, validation, ...other } = this.props;
        const { ...inputProps } = this.props.InputProps ? this.props.InputProps : {};
        let { helperText, error } = this.props;
        if (validation) {
            error = !validation.isValid();
            helperText = error ? validation.getErrorText() : helperText;
        }
        return (
            <TextField
                {...other}
                onChange={this.handleChange}
                value={value != null ? value : ""}
                error={error}
                helperText={helperText}
                InputProps={{
                    readOnly: inputProps.readOnly,
                    inputComponent: MoneyFactorFormat,
                }}
            />
        );
    }

    handleChange(ev) {
        let flotValue = parseFloat(ev.target.value);
        ev.target.value = isNaN(flotValue) ? 0 : flotValue;
        if (this.props.onChange) {
            this.props.onChange(ev);
        }
    }
}

MoneyFactorInput.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onChange: PropTypes.func,
    className: PropTypes.string
};

export default MoneyFactorInput;