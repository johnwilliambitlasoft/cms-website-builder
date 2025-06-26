"use client";
import React, { useState, useEffect } from "react";
import { generateWidgetForm } from "@/lib/utils";
import styles from "./widgetCustomizer.module.css";

/**
 * Component for customizing widget data based on schema
 *
 * @param {Object} props
 * @param {Object} props.widget - The widget definition
 * @param {Object} props.data - Current widget data
 * @param {Function} props.onChange - Callback when data changes
 * @returns {JSX.Element}
 */
const WidgetCustomizer = ({ widget, data, onChange }) => {
  const [activeSection, setActiveSection] = useState("content");
  const [form, setForm] = useState({ sections: [] });

  useEffect(() => {
    if (widget) {
      const generatedForm = generateWidgetForm(widget, data || {});
      setForm(generatedForm);

      // Set active section to first section if available
      if (generatedForm.sections.length > 0) {
        setActiveSection(generatedForm.sections[0].id);
      }
    }
  }, [widget, data]);

  const handleFieldChange = (fieldId, value) => {
    // Deep clone to avoid modifying props
    const newData = structuredClone(data || {});

    // Handle nested paths (e.g., "styles.backgroundColor")
    const pathParts = fieldId.split(".");

    if (pathParts.length === 1) {
      newData[fieldId] = value;
    } else {
      // Create nested objects if they don't exist
      let current = newData;
      for (let i = 0; i < pathParts.length - 1; i++) {
        const part = pathParts[i];
        if (!current[part]) {
          current[part] = {};
        }
        current = current[part];
      }
      current[pathParts[pathParts.length - 1]] = value;
    }

    onChange(newData);
  };

  const handleArrayItemChange = (arrayFieldId, itemIndex, itemField, value) => {
    // Deep clone to avoid modifying props
    const newData = structuredClone(data || {});

    // Handle nested paths for arrays
    const pathParts = arrayFieldId.split(".");
    let current = newData;

    // Navigate to the array
    for (let i = 0; i < pathParts.length; i++) {
      const part = pathParts[i];
      if (!current[part]) {
        current[part] = [];
      }
      current = current[part];
    }

    // Ensure the item exists
    if (!current[itemIndex]) {
      current[itemIndex] = {};
    }

    // Update the field
    current[itemIndex][itemField] = value;

    onChange(newData);
  };

  const addArrayItem = (arrayFieldId, defaultItem = {}) => {
    // Deep clone to avoid modifying props
    const newData = structuredClone(data || {});

    // Handle nested paths for arrays
    const pathParts = arrayFieldId.split(".");
    let current = newData;

    // Navigate to the array
    for (let i = 0; i < pathParts.length; i++) {
      const part = pathParts[i];
      if (!current[part]) {
        current[part] = [];
      }
      current = current[part];
    }

    // Add new item
    current.push(defaultItem);

    onChange(newData);
  };

  const removeArrayItem = (arrayFieldId, itemIndex) => {
    // Deep clone to avoid modifying props
    const newData = structuredClone(data || {});

    // Handle nested paths for arrays
    const pathParts = arrayFieldId.split(".");
    let current = newData;

    // Navigate to the array
    for (let i = 0; i < pathParts.length; i++) {
      const part = pathParts[i];
      if (!current[part]) {
        current[part] = [];
      }
      if (i === pathParts.length - 1) {
        // Remove the item
        current[part].splice(itemIndex, 1);
      } else {
        current = current[part];
      }
    }

    onChange(newData);
  };

  // Render field based on type
  const renderField = (field) => {
    switch (field.type) {
      case "text":
        return (
          <input
            type="text"
            id={field.id}
            value={field.value || ""}
            placeholder={field.placeholder}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            className={styles.textInput}
            maxLength={field.maxLength}
            required={field.required}
          />
        );

      case "textarea":
        return (
          <textarea
            id={field.id}
            value={field.value || ""}
            placeholder={field.placeholder}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            className={styles.textareaInput}
            maxLength={field.maxLength}
            required={field.required}
            rows={5}
          />
        );

      case "number":
        return (
          <input
            type="number"
            id={field.id}
            value={field.value || ""}
            placeholder={field.placeholder}
            onChange={(e) =>
              handleFieldChange(field.id, parseFloat(e.target.value))
            }
            className={styles.numberInput}
            required={field.required}
          />
        );

      case "color":
        return (
          <div className={styles.colorWrapper}>
            <input
              type="color"
              id={field.id}
              value={field.value || "#ffffff"}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              className={styles.colorInput}
            />
            <input
              type="text"
              value={field.value || ""}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              className={styles.colorText}
              placeholder="#RRGGBB"
            />
          </div>
        );

      case "checkbox":
        return (
          <input
            type="checkbox"
            id={field.id}
            checked={field.value || false}
            onChange={(e) => handleFieldChange(field.id, e.target.checked)}
            className={styles.checkboxInput}
          />
        );

      case "url":
      case "image":
        return (
          <input
            type="url"
            id={field.id}
            value={field.value || ""}
            placeholder={field.placeholder || "https://example.com"}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            className={styles.urlInput}
            required={field.required}
          />
        );

      case "array":
        const items = field.currentItems || [];
        return (
          <div className={styles.arrayField}>
            <div className={styles.arrayItems}>
              {items.map((item, index) => (
                <div key={index} className={styles.arrayItem}>
                  <div className={styles.arrayItemHeader}>
                    <h4>
                      {field.itemLabel} {index + 1}
                    </h4>
                    <button
                      type="button"
                      className={styles.removeButton}
                      onClick={() => removeArrayItem(field.id, index)}
                      aria-label="Remove item"
                    >
                      ×
                    </button>
                  </div>
                  <div className={styles.arrayItemFields}>
                    {field.itemFields.map((itemField) => (
                      <div key={itemField.id} className={styles.formGroup}>
                        <label htmlFor={`${field.id}-${index}-${itemField.id}`}>
                          {itemField.label}
                          {itemField.required && (
                            <span className={styles.required}>*</span>
                          )}
                        </label>
                        {renderItemField(
                          field.id,
                          index,
                          itemField,
                          item[itemField.id] || "",
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              className={styles.addButton}
              onClick={() => addArrayItem(field.id, {})}
              disabled={field.maxItems && items.length >= field.maxItems}
            >
              {field.addItemLabel || "Add Item"}
            </button>
          </div>
        );

      default:
        return (
          <input
            type="text"
            id={field.id}
            value={field.value || ""}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            className={styles.textInput}
          />
        );
    }
  };

  // Render an individual field within an array item
  const renderItemField = (arrayId, itemIndex, itemField, value) => {
    switch (itemField.type) {
      case "text":
        return (
          <input
            type="text"
            id={`${arrayId}-${itemIndex}-${itemField.id}`}
            value={value}
            placeholder={itemField.placeholder}
            onChange={(e) =>
              handleArrayItemChange(
                arrayId,
                itemIndex,
                itemField.id,
                e.target.value,
              )
            }
            className={styles.textInput}
            maxLength={itemField.maxLength}
            required={itemField.required}
          />
        );

      case "url":
        return (
          <input
            type="url"
            id={`${arrayId}-${itemIndex}-${itemField.id}`}
            value={value}
            placeholder={itemField.placeholder || "https://example.com"}
            onChange={(e) =>
              handleArrayItemChange(
                arrayId,
                itemIndex,
                itemField.id,
                e.target.value,
              )
            }
            className={styles.urlInput}
            required={itemField.required}
          />
        );

      // Add more field types as needed

      default:
        return (
          <input
            type="text"
            id={`${arrayId}-${itemIndex}-${itemField.id}`}
            value={value}
            onChange={(e) =>
              handleArrayItemChange(
                arrayId,
                itemIndex,
                itemField.id,
                e.target.value,
              )
            }
            className={styles.textInput}
          />
        );
    }
  };

  // If no widget provided
  if (!widget) {
    return <div className={styles.noWidget}>No widget selected</div>;
  }

  return (
    <div className={styles.widgetCustomizer}>
      <h3 className={styles.widgetTitle}>
        {widget.title || "Widget Settings"}
      </h3>

      {/* Section Tabs */}
      {form.sections.length > 0 && (
        <div className={styles.sectionTabs}>
          {form.sections.map((section) => (
            <button
              key={section.id}
              className={`${styles.sectionTab} ${activeSection === section.id ? styles.activeTab : ""}`}
              onClick={() => setActiveSection(section.id)}
            >
              {section.title}
            </button>
          ))}
        </div>
      )}

      {/* Form Fields */}
      {form.sections.map((section) => (
        <div
          key={section.id}
          className={`${styles.sectionFields} ${activeSection === section.id ? styles.activeSection : ""}`}
        >
          {section.fields.map((field) => (
            <div key={field.id} className={styles.formGroup}>
              <label htmlFor={field.id}>
                {field.label}
                {field.required && <span className={styles.required}>*</span>}
              </label>

              {field.description && (
                <p className={styles.fieldDescription}>{field.description}</p>
              )}

              {renderField(field)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default WidgetCustomizer;
