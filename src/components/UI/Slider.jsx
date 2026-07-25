import { useId, useMemo, useState } from 'react';
import { joinClasses } from './Button';

const defaultFormatter = (value, unit) => `${value}${unit ? ` ${unit}` : ''}`;

/**
 * Slider controlado ou nao-controlado. O callback recebe o valor numerico
 * primeiro e o evento nativo como segundo argumento.
 */
export default function Slider({
  id,
  label,
  description,
  value,
  defaultValue,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  formatValue,
  showValue = true,
  disabled = false,
  className,
  inputClassName,
  style,
  'aria-label': ariaLabel,
  ...inputProps
}) {
  const generatedId = useId();
  const sliderId = id || generatedId;
  const minimum = Number(min);
  const maximum = Number(max);
  const fallbackValue = defaultValue ?? minimum;
  const [internalValue, setInternalValue] = useState(fallbackValue);
  const isControlled = value !== undefined;
  const resolvedValue = Number(isControlled ? value : internalValue);
  const safeValue = Number.isFinite(resolvedValue) ? resolvedValue : minimum;
  const progress = useMemo(() => {
    if (maximum <= minimum) return 0;
    return Math.min(100, Math.max(0, ((safeValue - minimum) / (maximum - minimum)) * 100));
  }, [maximum, minimum, safeValue]);
  const displayValue = (formatValue || defaultFormatter)(safeValue, unit);

  const handleChange = (event) => {
    const nextValue = Number(event.target.value);
    if (!isControlled) setInternalValue(nextValue);
    onChange?.(nextValue, event);
  };

  return (
    <div className={joinClasses('wbp-slider', disabled && 'is-disabled', className)}>
      {label || showValue ? (
        <div className="wbp-slider__meta">
          {label ? (
            <label className="wbp-slider__label" htmlFor={sliderId}>
              {label}
            </label>
          ) : (
            <span className="wbp-slider__label" aria-hidden="true" />
          )}
          {showValue ? <output className="wbp-slider__value" htmlFor={sliderId}>{displayValue}</output> : null}
        </div>
      ) : null}

      {description ? <p className="wbp-slider__description">{description}</p> : null}

      <div className="wbp-slider__track-wrap">
        <input
          id={sliderId}
          className={joinClasses('wbp-slider__input', inputClassName)}
          type="range"
          min={minimum}
          max={maximum}
          step={step}
          value={safeValue}
          disabled={disabled}
          aria-label={ariaLabel || (!label ? 'Controle deslizante' : undefined)}
          aria-valuetext={displayValue}
          style={{ '--slider-progress': `${progress}%`, ...style }}
          onChange={handleChange}
          {...inputProps}
        />
      </div>
    </div>
  );
}
