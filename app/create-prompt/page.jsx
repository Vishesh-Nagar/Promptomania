'use client'

import {useEffect, useState } from 'react' 
import { useSession } from 'next-auth/react'
import {useRouter} from 'next/navigation'

import Form from '@components/Form'

import React from 'react'



const CreatePrompt = () => {
    const router = useRouter();
    const {data: session } = useSession();  
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({ 
        prompt: '', 
        tag:'',
    });

    

    useEffect(()=>{
        router.refresh();
    }, [])

    const createPrompt = async (e)=>{ 
        e.preventDefault();
        setSubmitting(true);
        try{ 
                const response = await fetch('/api/prompt/new', { 
                    method: 'POST', 
                    body:JSON.stringify({ 
                        prompt:post.prompt,
                        userId:session?.user.id,
                        tag:post.tag
                    })
                })
                if(response.ok){ 
                    router.push('/')
                    router.refresh()
                }
        } catch(err){ 
                console.log(err)
        } finally { 
            setSubmitting(false);
        }

    }
  return (
        <Form 
        type='Create'
        post={post}
        setPost = {setPost}
        submitting = {submitting}
        handleSubmit = {createPrompt}
        />
  )
}

export default CreatePrompt
