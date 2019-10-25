import produce, {Draft} from 'immer';
import {useCallback} from 'react';
import {getGlobal, setGlobal, useGlobal} from 'reactn';
import {State} from 'reactn/default';

// Use property of Global State
export function useGlobalImmer<S extends keyof State>( property: S ):
	[ State[S], ( f: ( draft: Draft<State[S]> ) => void | State[S] ) => void ];

/**
 * UseImmer for Global State
 *
 * @param {string} property
 */
export function useGlobalImmer( property ) {
	const [ val, updateValue ] = useGlobal( property );

	return [ val, useCallback( updater => {
		updateValue( produce( getGlobal()[ property ], updater ) );
	}, [ property, updateValue ] ) ];
}

// Use entire Global State
export function setGlobalImmer( updater: ( draft: Draft<State> ) => void | State ): Promise<State>;
// Use property of Global State
export function setGlobalImmer<S extends keyof State>( property: S, updater: ( draft: Draft<State[S]> ) => void | State[S] ): Promise<State[S]>;

/**
 * Set Global State with Immer.
 *
 * @param {string|Function} propertyOrProducer - If a function is passed, we are working with entire
 * global state and this argument is used as the producer.
 * @param {Function|undefined} [producer] - If a property is passed as the first parameter,
 *                                          this argument is the producer
 */
export function setGlobalImmer( propertyOrProducer, producer? ) {
	if ( producer as Function ) {
		return setGlobal( {
			[ propertyOrProducer ]: produce( getGlobal()[ propertyOrProducer ], producer )
		} );
	}
	return setGlobal( produce( getGlobal(), propertyOrProducer ) );
}
