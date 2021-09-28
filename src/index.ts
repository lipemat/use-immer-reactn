import produce, {Draft} from 'immer';
import {useCallback} from 'react';
import {getGlobal, setGlobal, useGlobal} from 'reactn';
import {State} from 'reactn/default';
import ReactNProvider from 'reactn/types/provider';

/**
 * Updater callback which supports passing a callback
 * function which accepts a draft or a finished state object.
 */
type Updater<T> = ( updater:
	// Pass an updater function which accepts a draft.
	( ( draft: Draft<T> ) => void | T ) |
	// Pass a finished object.
	T,
) => void;

// Use property of Global State.
export function useGlobalImmer<K extends keyof State>( property: K ):
	[ State[K], Updater<State[K]>];
// Use property from context provider.
export function useGlobalImmer<State extends {}, K extends keyof State>( property: K ):
	[ State[K], Updater<State[K]>];
// Use entire global state.
export function useGlobalImmer():
	[ State, Updater<State> ]
// Use entire context provider's state.
export function useGlobalImmer<State extends {}>():
	[ State, Updater<State> ]

/**
 * UseImmer for Global State
 *
 * @param {string|undefined} property
 */
export function useGlobalImmer( property? ) {
	const [ val, updateValue ] = useGlobal( property );

	return [ val, useCallback( updater => {
		if ( typeof updater === 'function' ) {
			updateValue( produce( val, updater ) );
		} else {
			updateValue( updater );
		}
	}, [ property, updateValue, val ] ) ];
}


// Set entire Global State.
export function setGlobalImmer( updater: ( draft: Draft<State> ) => void | State ): Promise<State>;
// Set property of Global State.
export function setGlobalImmer<K extends keyof State>( property: K, updater: ( draft: Draft<State[K]> ) => void | State[K] ): Promise<State>;

/**
 * Set Global State with Immer.
 *
 * @param {string|Function} propertyOrProducer - If a function is passed, we are working with entire
 * global state and this argument is used as the producer.
 * @param {Function|undefined} [producer] - If a property is passed as the first parameter,
 *                                          this argument is the producer
 */
export function setGlobalImmer( propertyOrProducer, producer? ) {
	if ( typeof producer === 'function' ) {
		return setGlobal( {
			[ propertyOrProducer ]: produce( getGlobal()[ propertyOrProducer ], producer )
		} );
	}
	return setGlobal( produce( getGlobal(), propertyOrProducer ) );
}


// Set entire context provider's state.
export function setGlobalImmerProvider<State>( provider: ReactNProvider<State>, updater: ( draft: Draft<State> ) => void | State ): Promise<State>;
// Set property of context provider's state.
export function setGlobalImmerProvider<State, K extends keyof State>( provider: ReactNProvider<State>, property: K, updater: ( draft: Draft<State[K]> ) => void | State[K] ): Promise<State>;

/**
 * Set Global State with Immer within a custom Provider.
 *
 * @param {ReactNProvider} provider - Provider created via `createProvider`.
 * @param {string|Function} propertyOrProducer - If a function is passed, we are working with entire
 * global state and this argument is used as the producer.
 * @param {Function|undefined} [producer] - If a property is passed as the first parameter,
 *                                          this argument is the producer
 */
export function setGlobalImmerProvider( provider, propertyOrProducer, producer? ) {
	if ( typeof producer === 'function' ) {
		return provider.setGlobal( {
			[ propertyOrProducer ]: produce( provider.getGlobal()[ propertyOrProducer ], producer )
		} );
	}
	return provider.setGlobal( produce( provider.getGlobal(), propertyOrProducer ) );
}
