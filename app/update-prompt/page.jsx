'use client'

import {Suspense, useState, useEffect } from 'react'
import {useRouter, useSearchParams} from 'next/navigation'
import Form from '@components/Form'


const UpdatePrompt = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const promptId = searchParams.get('id');
    const [submitting, setIsSubmitting] = useState(false);
    const [post, setPost] = useState({ 
        prompt: '', 
        tag:'',
    });


    useEffect(()=>{ 
        const getPromptDetails = async () =>{ 
            const response = await fetch(`/api/prompt/${promptId}`)
            const data = await response.json();

            setPost({ 
                prompt: data.prompt, 
                tag:data.tag,
            })
        }

        if(response?.ok){ 
            router.refresh();
        }

        if(promptId) getPromptDetails()

            
    }, [promptId])


    const updatePrompt = async (e)=>{ 
        e.preventDefault(); 
        setIsSubmitting(true);

        if(!promptId) return alert('Missing PromptId!');

        try{ 
            const response = await fetch(`/api/prompt/${promptId}`,{
                method:'PATCH', 
                body: JSON.stringify({ 
                    prompt: post.prompt, 
                    tag:post.tag, 
                }),
            });

            if(response.ok){
                router.push('/'); 
                router.refresh()

            }
        }
            catch(error){
                console.log(error);
            } finally{ 
                setIsSubmitting(false)
            }
        }
    
    
  return (
        <Form 
        type='Edit'
        post={post}
        setPost = {setPost}
        submitting = {submitting}
        handleSubmit = {updatePrompt}
        />
  )
}

export default function UpdatePromptPage() {  
    return (
        <Suspense fallback={<div>Loading...</div>}>
          <UpdatePrompt />
        </Suspense>
      );
};
