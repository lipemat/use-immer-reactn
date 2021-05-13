# Use Immer ReactN

[![version](https://img.shields.io/npm/v/use-immer-reactn.svg)](https://www.npmjs.com/package/use-immer-reactn) [![minzipped size](https://img.shields.io/bundlephobia/minzip/use-immer-reactn.svg)](https://www.npmjs.com/package/use-immer-reactn) [![downloads](https://img.shields.io/npm/dt/use-immer-reactn.svg)](https://www.npmjs.com/package/use-immer-reactn)

**React [hook](https://reactjs.org/docs/hooks-intro.html) and helper function for using [Immer](https://github.com/mweststrate/immer) with [ReactN](https://www.npmjs.com/package/reactn).**




## Install

* `npm install use-immer-reactn` or
* `yarn add use-immer-reactn`

## Usage

Assuming your global state set in ReactN looks like this:

```js
{
	title: {
		en: 'Hello World'
	}
}
```
-------------

### `useGlobalImmer`

Works very similar to `useGlobal` in ReactN with the one different being you pass a function (producer) to the "setValue" call instead of a new value.

The passed function works exactly the same as a "producer" in Immer. Receiving the original value as it's only parameter which may be mutated at will.

```jsx harmony
import {useGlobalImmer} from 'use-immer-reactn';

const TestComponent = () => {
	const [ title, setTitle ] = useGlobalImmer( 'title' );

	const changeTitleProducer = ( originalTitle ) => {
		originalTitle.en += ' Changed';
	};

	return (
		<>
			<h1>{title.en}</h1>
			<button onClick={() => setTitle( changeTitleProducer )}/>
		</>
	);
};
export default TestComponent;
```

**Simplified**

```jsx harmony
export default () => {
	const [ title, setTitle ] = useGlobalImmer( 'title' );
	return (
		<>
			<h1>{title.en}</h1>
			<button onClick={() => setTitle( original => {
				original.en += ' Changed';
			} )}/>
		</>
	);
};
```

You may omit the property when calling `useGlobalImmer` to work with the entire state object.

```jsx
export default () => {
	const [ state, setState] = useGlobalImmer();
	return (
		<>
			<h1>{state.title.en}</h1>
			<button onClick={() => setTitle( original => {
				original.title.en += ' Changed';
			} )}/>
		</>
	);
};
```

You may also pass a finished object instead of a callback to the updater function. This allows to externally finish an object and/or receive a draft to a callback from the same `useGlobalImmer` updater.

```jsx
export default () => {
	const [ title, setTitle ] = useGlobalImmer( 'title' );
	return (
		<>
			<h1>{title.en}</h1>
			<button
				onClick={() => setTitle( {
                    en : 'changed'
                })} />
			<button
				onClick={() => setTitle( original => {
					original.en += ' Changed';
				} )} />
		</>
	);
};
```

--------------------------

### `setGlobalImmer`

Works very similar to `setGlobal` in ReactN with two differences:
1. An (optional) property may be specified to work with just that key instead of the entire global state.
2. A function (producer) is passed instead of the new value.

#### Passing a property
The passed function works exactly the same as a "producer" in Immer. Receiving the original value of the specified key as it's only parameter which may be mutated at will.

```js
import {setGlobalImmer} from 'use-immer-reactn';
const changeTitleProducer = ( originalTitle ) => {
    originalTitle.en += ' Changed';
};
setGlobalImmer( 'title', changeTitleProducer );
```

**Simplified**
```js
setGlobalImmer( 'title', originalTitle => {
    originalTitle.en += ' Changed';
} )
```
#### Using entire global state
The passed function works exactly the same as a "producer" in Immer. Receiving the entire state (the same way `setGlobal` in ReactN does) as it's only parameter which may be mutated at will.

```js
import {setGlobalImmer} from 'use-immer-reactn';
const changeTitleProducer = ( original ) => {
    original.title.en += ' Changed';
};
setGlobalImmer( changeTitleProducer );
```

**Simplified**
```js
setGlobalImmer( 'title', original => {
    original.title.en += ' Changed';
} )
```

### `setGlobalImmerProvider`

Use when working with a custom provider created by `createProvider`.

Works very similar to `setGlobalImmer` except it accepts a `Provider` as the first argument.

```js
import {createProvider} from 'reactn';
import {setGlobalImmerProvider} from 'use-immer-reactn';

export const Provider = createProvider( {
	title: {
		en: 'Hello World'
	}
} )

const changeTitleProducer = originalTitle => {
	originalTitle.en += ' Changed';
};
setGlobalImmerProvider( Provider, 'title', changeTitleProducer );
```

**Simplified**

```js
setGlobalImmerProvider( Provider, 'title', title => {
    title.en += ' Changed';
} )
```


## TypeScript Support

Use Immer ReactN supports TypeScript out of the box! It is written entirely in TypeScript. This gives it powerful intellisense, auto-complete, and error-catching abilities.

While there is not configuration required to use this package, there is one caveat passed down from [ReactN](https://www.npmjs.com/package/reactn) which requires you to setup a `src/global.d.ts` file to tell TypeScript the shape of your global state.

If you are already using TypeScript with ReactN, odds are good you have already gone through the [steps outlined here](https://www.npmjs.com/package/reactn#typescript-support). If not, you'll likely want to do so.












