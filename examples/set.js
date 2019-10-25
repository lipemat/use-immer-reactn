import {setGlobalImmer} from 'use-immer-reactn';
import {setGlobal} from 'reactn';

setGlobal( {
	title: {
		en: 'Hello'
	}
} );
const changeTitleProducer = ( originalTitle ) => {
	originalTitle.en += ' Changed';
};
setGlobalImmer( 'title', changeTitleProducer );
