import {setGlobalImmer, useGlobalImmer} from 'use-immer-reactn';
import {mount} from 'enzyme';
import {getGlobal, setGlobal} from 'reactn';
import React from 'react';

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

beforeEach( async() => {
	await setGlobal( {
		title: {
			en: 'Hello'
		}
	} );
} );

describe( 'Global State', () => {
	it( 'Verify setGlobalImmer', async() => {
		const changeTitleProducer = ( originalTitle ) => {
			originalTitle.en += ' Changed';
		};
		expect( getGlobal().title.en ).toEqual( 'Hello' );
		await setGlobalImmer( 'title', originalTitle => {
			originalTitle.en += ' Changed';
		} );
		expect( getGlobal().title.en ).toEqual( 'Hello Changed' );

		await setGlobalImmer( original => {
			original.title.en = 'Globally Changed';
		} );
		expect( getGlobal().title.en ).toEqual( 'Globally Changed' );

	} );

	it( 'Verify useGlobalImmer', async() => {
		const wrapper = mount( <TestComponent/> );
		expect( wrapper.find( 'h1' ).text() ).toEqual( 'Hello' );
		wrapper.find( 'button' ).simulate( 'click' );
		expect( wrapper.find( 'h1' ).text() ).toEqual( 'Hello Changed' );
	} );


} );
