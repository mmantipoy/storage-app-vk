import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/index';
import { Product, setData, updateProductQuantity, deleteProduct } from '../../store/cardSlice';
import './CardList.scss'
import { Avatar, Button, Card } from '@vkontakte/vkui';
import { getCardData } from '../../api/card/getCard';
import React from 'react';
import textData from '../../static/cardList.json'

const CardList = (): JSX.Element => {
  const card = useSelector((state: RootState) => state.card.value);
  const dispatch = useDispatch();

    useEffect(() => {

        updateList();
    }, [])

    const [iter, setIter] = useState(0);

    const updateList = async () => {

        const data = await getCardData(iter).then((res) => res).catch(() => null);
        setIter(prev => ((prev+1)%10));
        dispatch(setData(data.carts[0]));
    }

    const text = textData.text.cardList;
  return (
    <div>
    <div className='header'>
        <h2>{text.header_text}</h2>
      <Button onClick={updateList}>{text.refetch}</Button>
    </div>
      
      <div>
        <div className="container">
            <div className="column column-left">
                
                {card.products.map((val: Product, index) => 
                <>
                    <Card key={val.id} className='card-wrapper'>
                        <Avatar size={96} src={val.thumbnail} alt="" />
                        <div className='card-data'>
                            <p>{val.title}</p>
                            <div className='card-row'>
                                <p>{`${text.discount} - `}{val.discountPercentage}</p> {' | '}
                                <p>{`${text.priceForYou} - `}{val.price}</p>
                            </div>
                            <div className='card-row'>
                                <Button 
                                mode={'outline'} 
                                rounded={true} 
                                onClick={() => dispatch(deleteProduct({id: val.id, num: val.quantity, price: val.price}))}>
                                    <img src="/public/svg/bucket.svg" alt="" width={20} height={20} />
                                </Button>
                                <Button 
                                mode={val.quantity < 10 ? 'primary' : 'secondary' } 
                                hasHover={val.quantity < 10 } 
                                rounded={true} 
                                onClick={val.quantity < 10 ? () => dispatch(updateProductQuantity({id: index, num: 1})) : ()=>{}}>+</Button>
                                <div>{val.quantity}</div>
                                <Button 
                                mode={val.quantity > 1 ? 'primary' : 'secondary' } 
                                hasHover={val.quantity > 1 } 
                                rounded={true} 
                                onClick={val.quantity > 1 ? () => dispatch(updateProductQuantity({id: index, num: -1})) : ()=>{}}>-</Button>
                            </div>
                        </div>
                    </Card>
                </>)}

                {card.products.length == 0 ? <p>{text.noGoods}</p> : <></>}

            </div>
            <div className="column column-right">
                <p>{`${text.sum}: `}{card.total} {` ${text.rub}`}</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CardList;