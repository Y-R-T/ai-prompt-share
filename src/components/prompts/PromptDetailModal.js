// frontend/src/components/prompts/PromptDetailModal.js
import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react'; // Headless UI for accessible modals
import { XMarkIcon, DocumentDuplicateIcon, CheckIcon } from '@heroicons/react/24/outline';
import GlobalSpinner from '../common/GlobalSpinner'; // 全局加载指示器

function PromptDetailModal({ isOpen, onClose, promptData }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    if (promptData && promptData.content) {
      navigator.clipboard.writeText(promptData.content)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
        })
        .catch(err => console.error('Failed to copy: ', err));
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-slate-800 border border-slate-700 p-6 text-left align-middle shadow-xl transition-all">
                {!promptData || promptData.error ? (
                    <div className="py-12">
                        {promptData?.error ? 
                            <p className="text-red-400 text-center">{promptData.error}</p> :
                            <GlobalSpinner message="正在加载Prompt详情..." />
                        }
                    </div>
                ) : (
                  <>
                    <Dialog.Title as="h3" className="text-2xl font-bold leading-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-1">
                      {promptData.title}
                    </Dialog.Title>
                    <button
                        type="button"
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 transition-colors"
                        onClick={onClose}
                        aria-label="关闭弹窗"
                    >
                        <XMarkIcon className="h-7 w-7" />
                    </button>

                    <div className="mt-1 text-xs text-gray-500">
                      <span>作者: {promptData.author_name}</span> | <span>分类: {promptData.category}</span>
                    </div>

                    {promptData.description && (
                      <p className="mt-4 text-sm text-gray-300">{promptData.description}</p>
                    )}

                    <div className="mt-5 relative">
                      <h4 className="text-sm font-semibold text-purple-300 mb-2">Prompt 内容:</h4>
                      <div className="bg-slate-900 p-4 rounded-md max-h-80 overflow-y-auto border border-slate-700">
                        <pre className="text-gray-200 whitespace-pre-wrap break-words text-sm leading-relaxed">
                          {promptData.content}
                        </pre>
                      </div>
                      <button
                        onClick={handleCopy}
                        title={copied ? "已复制!" : "复制Prompt内容"}
                        className={`absolute top-0 right-0 mt-1 mr-1 p-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 ${
                          copied ? 'bg-green-600 hover:bg-green-700' : 'bg-purple-600 hover:bg-purple-700'
                        }`}
                      >
                        {copied ? <CheckIcon className="h-5 w-5 text-white" /> : <DocumentDuplicateIcon className="h-5 w-5 text-white" />}
                      </button>
                    </div>

                    {promptData.tags && promptData.tags.length > 0 && (
                      <div className="mt-5">
                        <h4 className="text-sm font-semibold text-purple-300 mb-2">标签:</h4>
                        <div className="flex flex-wrap gap-2">
                          {promptData.tags.map((tag, index) => (
                            <span key={index} className="bg-slate-700 text-purple-300 text-xs px-3 py-1 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="mt-6 flex justify-end">
                        <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-slate-700 px-4 py-2 text-sm font-medium text-gray-200 hover:bg-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-800 transition-colors"
                        onClick={onClose}
                        >
                        关闭
                        </button>
                    </div>
                  </>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
export default PromptDetailModal;