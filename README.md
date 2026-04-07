# react-lite-float-inputs

A lightweight, high-performance React input library featuring **Material-style floating labels** with a **minimal DOM footprint**.

Designed for developers who want clean markup, smooth UX, and full control — without `fieldset`, extra wrappers, or heavy dependencies.

---

## Features

* **Ultra-lightweight DOM**

  * Only **one wrapper div**, plus `input` / `textarea` / `select` and `label`
  * No `fieldset`, no legends, no unnecessary elements

* **Dual-text system (Unique Feature)**

  * **Placeholder text** appears inside the field initially
  * **Label text** floats to the top on focus/value
  * Placeholder and label can be **different** or the **same**

* **Border-integrated floating label**

  * Label smoothly animates into the border area
  * Clean, modern Material-style look

* **Smooth CSS-only animations**

  * No JS animation overhead
  * GPU-friendly transitions

* **Components included**

  * `Input`
  * `TextArea`
  * `Select`

---

## Installation

```bash
npm install react-lite-float-inputs
```

or

```bash
yarn add react-lite-float-inputs
```

---

## Import

```js
import Input, { TextArea, Select } from "react-lite-float-inputs";
```

---

## Basic Usage

### Input

```jsx
<Input
  type="text"
  name="name"
  label="name"
  value={form.budget}
  onChange={handleChange}
  placeholder="Your Name"
/>
```

### TextArea

```jsx
<TextArea
  name="message"
  value={form.message}
  onChange={handleChange}
  label="Message"
  placeholder="Tell us about yourself"
  rows={5}
  required
/>
```

---

## Select Usage

```jsx
<Select
  name="category"
  label="Category"
  value={form.category}
  onChange={handleChange}
>
  <option value="">Select a category</option>
  <option value="web">Web Development</option>
  <option value="mobile">Mobile App</option>
  <option value="design">UI/UX Design</option>
</Select>
```

---

## Checkbox Usage

```jsx
<Checkbox
  name="agree"
  label="I agree to the terms and conditions"
/>
```

---

## Radio Usage Generic

```jsx
<Radio
  name="fruit"
  label="Apple"
  value="apple"
/>
<Radio
  name="fruit"
  label="orange"
  value="Orange"
/>
```

---

## Radio Usage Multiple

```jsx
<Radio
  name="fruit"
  options={[
      { value: 'apple', label: 'Apple' },
      { value: 'orange', label: 'Orange' },
      { value: 'banana', label: 'Banana' }
  ]}
  selectedValue={'apple'}
/>
```

### Customize Colors
```
:root {
    --input-color-primary: #FFF; /* Set your primary color */
    --input-color-background: #151515; /* Set your background color */
    --input-color-border: #CCCCCC; /* Set your border color, it will be automatically set from computed primary color if unset*/
    --input-color-placeholder: #999999; /* Set your placeholder color, it will be automatically set from computed primary color if unset */
}
```

---

##  How the Dual-Text System Works

| State             | What you see                             |
| ----------------- | ---------------------------------------- |
| Empty & unfocused | Placeholder text inside the field        |
| Focused           | Placeholder animates into floating label |
| Has value         | Label stays floated                      |

* If `label` and `placeholder` are **different** → both are respected
* If `label` is omitted → placeholder text is reused as label

---

## DOM Structure (Example)

```html
<div class="rfl-input-wrapper">
  <input /> <!-- with all props passed -->
  <label>Label Text</label>
</div>
```

That’s it. No extra noise.

---

## Props

### Common Props (Input / TextArea / Select)

| Prop          | Type       | Description              |
| ------------- | ---------- | ------------------------ |
| `label`       | `string`   | Floating label text      |
| `placeholder` | `string`   | Initial placeholder text |
| `name`        | `string`   | Input name               |
| `value`       | `string`   | Controlled value         |
| `onChange`    | `function` | Change handler           |
| `required`    | `boolean`  | Marks field as required  |
| `disabled`    | `boolean`  | Disables the field       |
| `wrapperClassName`| `string`   | Custom class for wrapper |
| `labelClassName`| `string`   | Custom class for label |
| `inputClassName`| `string`   | Custom class for input |

### Input-specific

| Prop   | Type     | Description                        |
| ------ | -------- | ---------------------------------- |
| `type` | `string` | text, email, password, number, etc |

### TextArea-specific

| Prop   | Type     | Description    |
| ------ | -------- | -------------- |
| `rows` | `number` | Number of rows |

---

## Styling

The library ships with sensible defaults.

You can override styles using:

* Wrapper class
* Input / label selectors
* CSS variables (if provided by your theme)

Example:

```css
.rfl-wrapper {
  --rfl-border-color: #ccc;
  --rfl-focus-color: #6366f1;
}
```

---

## Compatibility

* ✅ React 18+
* ✅ Next.js (App & Pages Router)
* ✅ Vite / CRA

---

## Philosophy

This library was built with one goal:

> **Maximum UX with minimum markup**

If you care about performance, DOM cleanliness, and polished micro-interactions — this is for you.

---

## License

MIT © Abdullah Ibne Alam

---

## Contributing

Pull requests are welcome! <br />
If you have ideas for enhancements or performance improvements, feel free to open an issue.<br />
[https://github.com/RepulsiveCoder/react-lite-float-inputs](https://github.com/RepulsiveCoder/react-lite-float-inputs)

---

## If you like it…

Drop a ⭐ on the repo and use it to make your UI feel alive!
